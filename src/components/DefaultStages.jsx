import { Link } from "react-router-dom";
import { RoutePath } from "../common/Route";

const DefaultStages = () => {
    return (
        <>
            <div className="bg-green-400 p-10 h-screen text-center max-w-screen-lg mx-auto ">
          <h1 className="text-4xl  my-3">　Default Stage Select　</h1>
          
                
<div className="flex flex-wrap -mx-2">
  {/* Repeat this card for each stage */}
  <div className="p-3 w-1/3 md:w-1/3 lg:w-1/3">
    <div className="flex p-5 bg-white items-start border-2 border-black ">
      {/* Left side container for stage name and button */}
      <div className="flex flex-col justify-start items-start p-2 " style={{ width: '100px' }}>
        <h1 className="text-lg font-bold mb-4">Stage 1</h1>
        <Link to={RoutePath.sample3.path}><button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none">
          Play
                                </button>
                                    </Link>
      </div>
      {/* Right side container for the image */}
      <div>
       <Link to={RoutePath.sample3.path}><img src={`${process.env.PUBLIC_URL}/image2.png`} alt="Stage"  /></Link> 
      </div>
    </div>
  </div>
                    {/* ... other cards */}
                    <div className="p-3 w-1/3 md:w-1/3 lg:w-1/3">
    <div className="flex p-5 bg-white items-start border-2 border-black ">
      {/* Left side container for stage name and button */}
      <div className="flex flex-col justify-start items-start p-2 " style={{ width: '100px' }}>
        <h1 className="text-lg font-bold mb-4">Stage 2</h1>
        <Link to={RoutePath.sample3.path}><button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none">
          Play
                                </button>
                                    </Link>
      </div>
      {/* Right side container for the image */}
      <div>
       <Link to={RoutePath.sample3.path}><img src={`${process.env.PUBLIC_URL}/image2.png`} alt="Stage"  /></Link> 
      </div>
    </div>
  </div>

</div>  






        </div>
        </>
    );
}

export default DefaultStages;