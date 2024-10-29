import CallForAction from '@/components/CallForAction';
import Solution from '@/components/Solution'
import HomePageData from "@/fakeDatas/HomePageFakes"

export default function Home() {
  return (
    <>
      <div className='flex flex-col gap-10 justify-center items-center mt-5'>
       <Solution SolutionSectionData={HomePageData.SolutionSectionData}/>
       <CallForAction  CallForActionData={HomePageData.CallForActionData}/>
      </div>
    </>
  );
}
