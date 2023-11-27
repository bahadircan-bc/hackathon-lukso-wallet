import React, { useCallback, useEffect, useState } from "react";
import UniversalProfile from "@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import axios from "axios";

const web3 = new Web3(window.lukso);
const backendUrl = import.meta.env.VITE_BACKEND_NGROK_URL;
console.log(backendUrl);
const authEndpoint = "/api/auth";

const sendHandleToBackend = async (handle: string, address: string) => {
    const postData = {
        handle,
        address,
    };
    axios
        .post(backendUrl + "/api/instagram", postData, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
};

const updateInstagramHandle = async (handle: string, address: string) => {
    try {
        const contract = new web3.eth.Contract(
            UniversalProfile.abi as AbiItem[],
            address
        );

        const key = web3.utils.keccak256("InstagramHandle");
        const value = web3.utils.asciiToHex(handle);
        const receipt = await contract.methods.setData(key, value).send({
            from: address,
            gas: "1000000",
        });
        console.log("Transaction successful:", receipt);
        sendHandleToBackend(handle, address);
    } catch (error) {
        console.error("Error updating Instagram handle:", error);
    }
};

const extensionIsInstalled = () => {
    return typeof window.lukso !== "undefined";
};

let isConnecting = false;

export default function SignUpFinal() {
    const [instagramHandle, setInstagramHandle] = useState<string | undefined>("");
    const [retrievedHandle, setRetrievedHandle] = useState<string | undefined>("");
    const [address, setAddress] = useState<string | undefined>();

    const authorizeInstagram = useCallback(async () => {
        window.addEventListener(
            "message",
            (event) => {
                if (event.origin !== backendUrl) return;
                console.log(event.origin);
                console.log("message data: ", event.data);
                setInstagramHandle(event.data);
            },
            false
        );
        const newWindow = window.open(
            backendUrl + authEndpoint,
            "_blank",
            "height=600,width=400"
        );
        if (newWindow) {
            newWindow.onclose = () => {
                newWindow.window.postMessage("hello", "*");
            };
        }
    }, [backendUrl, authEndpoint]);

    const connect = useCallback(async () => {
        if (isConnecting) {
            console.log("Connection request already in progress.");
            return;
        }

        isConnecting = true;

        try {
            const accounts = await web3.eth.requestAccounts();
            setAddress(accounts[0]);
            console.log("Connected with", accounts[0]);
        } catch (error) {
            console.log(error);
            return;
        }
    }, []);

    useEffect(() => {
        connect();
    }, [connect]);

    useEffect(() => {
        const getInstagramHandle = async (
            address: string
        ): Promise<string | undefined> => {
            try {
                const contract = new web3.eth.Contract(
                    UniversalProfile.abi as AbiItem[],
                    address
                );

                const key = web3.utils.keccak256("InstagramHandle");
                const data = await contract.methods.getData(key).call();
                if (!data) return;
                const handle = web3.utils.hexToAscii(data);
                console.log("Instagram Handle:", handle);
                return handle;
            } catch (error) {
                console.error("Error fetching Instagram handle:", error);
            }
        };

        if (address) {
            getInstagramHandle(address).then((handle) => {
                setRetrievedHandle(handle);
            });
        }
    }, [address]);

    const buttonStyle = {
        backgroundColor: "#fe005b",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "center",
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
    };

    if (!extensionIsInstalled()) {
        return (
            <div style={containerStyle}>
                <div>Please install Lukso Wallet extension</div>
            </div>
        );
    }

    if (!address) {
        return (
            <div style={containerStyle}>
                <div style={buttonStyle} onClick={() => {
                    isConnecting = false;
                    connect();
                }}>
                    Connect Your Universal Profile
                </div>
            </div>
        );
    }

    if (!retrievedHandle) {
        return (
            <div style={containerStyle}>
                <div>Hello {address}</div>
                {instagramHandle ? (
                    <div style={buttonStyle}>Authorized Instagram Handle: {instagramHandle}</div>
                ) : (
                    <div style={buttonStyle} onClick={authorizeInstagram}>Login to your Instagram</div>
                )}
                <div style={buttonStyle} onClick={() => {
                    if (instagramHandle)
                        updateInstagramHandle(instagramHandle, address);
                }}>
                    Update Instagram Handle
                </div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div>Hello {address}</div>
            <div style={buttonStyle} onClick={authorizeInstagram}>
            Instagram Handle: {instagramHandle===''  ? 'Not Authorized' : instagramHandle}
            </div>
            <div style={buttonStyle} onClick={() => {
                if (instagramHandle) updateInstagramHandle(instagramHandle, address);
            }}>
                Update Instagram Handle
            </div>
            {/* <div style={buttonStyle} onClick={async () => {
                const postData = {
                    address: address,
                    handle: retrievedHandle,
                };
                axios
                    .post(backendUrl + "/api/instagram", postData, {
                        headers: {
                            "ngrok-skip-browser-warning": "69420",
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }}>
                Test
            </div> */}
        </div>
    );
}