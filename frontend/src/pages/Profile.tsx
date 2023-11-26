const ProfilePage = () => {
  // User information
  const userInfo = {
    name: 'Fazlı Altun',
    age: 21,
    occupation: 'Mobile Developer',
    profilePicture: 'https://avatars.githubusercontent.com/u/32793348?v=4', // Avatar URL
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center">
        <div className="mr-5">
          <img className="w-[100px] aspect-square rounded-[50%]" src={userInfo.profilePicture} alt="Profile Picture" />
        </div>
        <div className="text-left">
          <h1>{userInfo.name}</h1>
          <p>{userInfo.age} years old</p>
          <p>{userInfo.occupation}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;