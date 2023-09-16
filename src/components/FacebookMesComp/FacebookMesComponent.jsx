"use client";
import { CustomChat, FacebookProvider } from "react-facebook";

const FacebookMesComponent = () => {
  return (
    <FacebookProvider appId="841329210718095" chatSupport>
      <CustomChat pageId="140233752495885" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMesComponent;
