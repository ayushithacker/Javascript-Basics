export default function({children}{
    children: React.ReactNode;
  }){
    return(
        <div>
        <div className="border-b  p-1 text-center"> This is banner</div>
        {children}
        </div>
    )
}