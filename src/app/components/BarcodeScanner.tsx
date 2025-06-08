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
  
    let controls: any;
  
    (async () => {
      controls = await codeReader.decodeFromVideoDevice(
        undefined,
        videoEl,
        (result, error, ctrl) => {
          if (result) {
            const code = result.getText();
            console.log("✅ 読み取ったコード:", code);
            if (/^\d{13}$/.test(code)) {
              onDetected(code);
              // 必要なら読み取り後に停止も可能：
              // ctrl.stop();
            }
          }
        }
      );
    })();
  
    return () => {
      // コンポーネントアンマウント時にカメラ停止
      if (controls) {
        controls.stop();
      }
    };
  }, [onDetected]);

  // useEffect(() => {
  //   const codeReader = new BrowserMultiFormatReader();
  //   const videoEl = document.getElementById("barcode-video") as HTMLVideoElement;

  //   if (!videoEl) return;

  //   codeReader.decodeFromVideoDevice(
  //     undefined,
  //     videoEl,
  //     (result, err) => {
  //       if (result) {
  //         const code = result.getText();
  //         console.log("✅ 読み取ったコード:", code);
  //         if (/^\d{13}$/.test(code)) {
  //           onDetected(code);
  //         }
  //       }
  //     }
      // {
      //   video: {
      //     width: { ideal: 640 },
      //     height: { ideal: 480 },
      //     facingMode: "environment",
      //   },
      // }
    );

    // return () => {
    //   if (typeof codeReader.reset === "function") {
    //     codeReader.reset();
    //   }
    // };

    return () => {
      codeReader.stopContinuousDecode();
    };
  }, [onDetected]);

  return (
    <video
      id="barcode-video"
      className="w-full aspect-video rounded-lg border border-gray-300"
    />
  );
}

