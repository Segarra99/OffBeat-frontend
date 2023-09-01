import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import BandList from "../../Components/BandList";

function BandListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the searchQuery state
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <BandList searchQuery={searchQuery} />
    </div>
  );
}

export default BandListPage;