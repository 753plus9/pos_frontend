"use client";

import { useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

type Props = {
  onDetected: (code: string) => void;
};

export default function BarcodeScanner({ onDetected }: Props) {
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const videoEl = document.getElementById("barcode-video") as HTMLVideoElement;

    if (!videoEl) return;

    codeReader.decodeFromVideoDevice(
      undefined,
      videoEl,
      (result, err) => {
        if (result) {
          const code = result.getText();
          console.log("✅ 読み取ったコード:", code);
          if (/^\d{13}$/.test(code)) {
            onDetected(code);
          }
        }
      },
      {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "environment",
        },
      }
    );

    return () => {
      if (typeof codeReader.reset === "function") {
        codeReader.reset();
      }
    };
  }, [onDetected]);

  return (
    <video
      id="barcode-video"
      className="w-full aspect-video rounded-lg border border-gray-300"
    />
  );
}


// "use client";

// import { useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";

// type Props = {
//   onDetected: (code: string) => void;
// };

// export default function BarcodeScanner({ onDetected }: Props) {
//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();
//     const videoEl = document.getElementById("barcode-video") as HTMLVideoElement;

//     if (!videoEl) return;

//     codeReader.decodeFromVideoDevice(undefined, videoEl, (result, err) => {
//       if (result) {
//         const code = result.getText();
//         console.log("✅ 読み取ったコード:", code);
//         // 13桁の数字（JANコード）だけを受け付ける
//         if (/^\d{13}$/.test(code)) {
//           onDetected(code);
//         }
//       }
//     },
//     );

//     return () => {
//     //   codeReader.reset();
//     // ✅ reset() ではなく stopDecoding() を使用
//     //   codeReader.stopDecoding();
//     // ✅ reset が存在するかチェックしてから呼ぶ（安全）
//     if (typeof codeReader.reset === "function") {
//     codeReader.reset();
//     }
//     };
//   }, [onDetected]);

//   return (
//     <video
//       id="barcode-video"
//       className="w-full aspect-video rounded-lg border border-gray-300"
//     />
//   );
// }
