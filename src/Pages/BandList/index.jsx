import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BandList from "../../Components/BandList";

function BandListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(()=>{
    const searchedBand = searchParams.get("searched");
    setSearchQuery(searchedBand);
  }, [searchParams])
  return (
    <div>
      <BandList searchedBands={searchQuery}/>
    </div>
  );
}

export default BandListPage;