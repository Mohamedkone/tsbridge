/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useLayoutEffect, useState } from "react";
import { Box, ToggleButton, Typography, ToggleButtonGroup } from "@mui/material";
import Live from "./Live";
import Integration from "./Integration";
import { useSearchParams } from "react-router-dom";


const TabsPanel = ({setGenerateBtn}:any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayMode, setDisplayMode] = useState(searchParams.get('panel')||"Live")
  useEffect(()=>{
    setGenerateBtn(searchParams.get('panel')||"Live")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useLayoutEffect(()=>{
    const views =  ["Live", "Integration"]
    let param
    if(views.includes(searchParams.get('panel'))){
      param = searchParams.get('panel')
    }else{
      param = "Live"
    }
    setSearchParams(`panel=${param}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    setDisplayMode(searchParams.get('panel') || "Live")
  },[searchParams])

  const handleDisplayMode = (_event:any, nextValue:any) => {
    if (nextValue !== null){
      setDisplayMode(nextValue);
      setGenerateBtn(nextValue);
      updateQueryParams(nextValue)
    }
  };

  const updateQueryParams = (tab:any) => {
    searchParams.set('panel', tab);
    setSearchParams(searchParams);
  };

  

  return (
    <Box>
      <ToggleButtonGroup
          value={displayMode}
          onChange={handleDisplayMode}
          exclusive
        >
        <ToggleButton value={"Live"} aria-label="list-mode">
          <Typography fontWeight={'bold'}>Live</Typography>
        </ToggleButton>
        {/* <ToggleButton value={"Direct"} aria-label="card-mode">
          <Typography fontWeight={'bold'}>Direct</Typography>
        </ToggleButton> */}
        <ToggleButton value={"Integration"} aria-label="card-mode">
          <Typography fontWeight={'bold'}>Integration</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <Box p={2}>
        {
        displayMode === "Live" ? 
        <Live /> 
        // :
        // displayMode === "Direct" ? 
        // <Direct /> 
        :
        displayMode === "Integration" ? 
        <Integration />
        :
        <div>An issue has occured</div>
        }
      </Box>
    </Box>
  );
};

export default TabsPanel;
