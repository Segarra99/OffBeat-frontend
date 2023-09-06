import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BandList from "../../Components/BandList";

function BandListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(()=>{
    const searched = searchParams.get("searched");
    setSearchQuery(searched);
  }, [searchParams])
  return (
    <div>
      <BandList searched={searchQuery}/>
    </div>
  );
}

export default BandListPage;