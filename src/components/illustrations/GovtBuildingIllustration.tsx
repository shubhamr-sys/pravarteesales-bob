import Image from "next/image";
import indianMap from "@/assets/indian-map.png";

export default function GovtBuildingIllustration() {
  return (
    <Image
      src={indianMap}
      alt="Map of India"
      className="w-full h-full object-contain"
    />
  );
}
