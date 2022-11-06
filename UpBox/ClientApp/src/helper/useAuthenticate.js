import { useState } from "react";

export default function useAuthenticate() {
  const [authenticate, setAuthenticate] = useState(false);

  return {
    setAuthenticate: setAuthenticate,
    authenticate,
  };
}
