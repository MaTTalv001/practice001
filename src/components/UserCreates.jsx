const UserCreates = () => {
    return (
        <>
            <div className="bg-pink-100 p-10  text-center max-w-screen-lg mx-auto">
          <h1 className="text-4xl  my-3">　Stage Select　</h1>
          <form className="flex flex-col items-center gap-4 w-full px-1">
            <div className="flex w-full max-w-md items-center">
              <input type="text" id="username" placeholder="Username" className="w-full p-2 rounded" />
            </div>
            
            <div className="flex w-full max-w-md items-center">
              <input type="email" id="email" placeholder="Email" className="w-full p-2 rounded" />
            </div>
            
            <div className="flex w-full max-w-md items-center">
              <input type="password" id="password" placeholder="password" className="w-full p-2 rounded" />
            </div>
              
            <div className="flex w-full max-w-md items-center">
              <input type="password" id="password-confirm" placeholder="password確認" className="w-full p-2 rounded" />
            </div>
            
            <div className="mt-4 bg-yellow-200 hover:bg-yellow-400 rounded-full">
              <button type="submit" className=" text-black font-bold py-2 px-4">
                Let's Sign Up!
              </button>
            </div>
          </form>
        </div>
        </>
    );
}

export default UserCreates;