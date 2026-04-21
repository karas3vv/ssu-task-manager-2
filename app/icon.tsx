import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#206a5d",
          color: "#fffaf1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 148,
          fontWeight: 800
        }}
      >
        TF
      </div>
    ),
    size
  );
}
