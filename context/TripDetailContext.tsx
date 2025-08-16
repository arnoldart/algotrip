import { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import React, { createContext } from "react";

export type TripDetailContextType = {
  tripDetailInfo: TripInfo | null;
  setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
};

export const TripDetailContext = createContext<TripDetailContextType | null>(null);
