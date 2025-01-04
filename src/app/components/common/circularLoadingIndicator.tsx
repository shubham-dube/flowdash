import React from "react";

 const Spinner: React.FC<{className?: string, size?: number}> = ({className})=> {
  return (
    <div className={`border-2 border-t-transparent rounded-full animate-spin ` +" " + className}></div>
  );
}

export default Spinner;