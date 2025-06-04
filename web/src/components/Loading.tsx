import NavigationBar from "./NavigationBar.tsx";
import Azazel from "../assets/specialist.gif";

interface LoadingProps {
  isLoading: boolean,
  active: string,
  text: string,
}

export default function Loading({isLoading, active, text}:LoadingProps) {
  if (isLoading) {
    return (
      <div className='h-full'>
        <NavigationBar active={active}/>
        <div className='flex flex-col justify-center h-full absolute top-0 bottom-0 w-full'>
          <img src={Azazel} alt='Loading gif' className='mx-auto'/>
          <div className="p-1 text-center text-xl">
            {text}
          </div>
        </div>
      </div>
    );
  }
}