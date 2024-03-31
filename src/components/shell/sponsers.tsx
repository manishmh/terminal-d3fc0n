import Image from "next/image"

const Sponsers = () => {
  return (
    <div className="flex gap-4 absolute right-8 top-8">
        <Image 
            src="/bitget.PNG" 
            alt="bitget-sponsor"
            width={40}
            height={40}
        />
        <Image 
            src="/innov.png" 
            alt="innovotive-sponsor"
            width={70}
            height={50}
        />
    </div>
  )
}

export default Sponsers