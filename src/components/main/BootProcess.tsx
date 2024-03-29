import React from "react";
import { bootText } from "./WelcomeText";
import WelcomeBox from "./WelcomeBox";
import CustomTypewriter from "./CustomWriter";
const TypewriterEffect: React.FC = () => {
  return (
    <>
      <div className="relative  h-fit w-full max-w-[120rem]">
        Booting Linux kernel version 6.8.1-amd64
        <br />
        Command line: BOOT_IMAGE=/boot/vmlinuz-6.8.1-amd64
        root=UUID=xxxxxXXX-XXXX-XXXX-XXXX-XXXXXXXXxxxx ro quiet splash
        <br />
        Detected CPU architecture: x86 64
        <br />
        Initializing hardware...
        <div className="pl-16">
          -ACPI: ACPI BIOS is upgraded
          <br />
          -Faking a node at [mem 0x0000000000000000-0x00000001f5ffffff]
          <br />
          -NODE_DATA(0) allocated [mem 0x1f5fc9000-0x1f5fffffff]
          <br />
          -Zone ranges:
          <br />
        </div>
        <CustomTypewriter text={bootText} speed={2} ><WelcomeBox/></CustomTypewriter>
      </div>
    </>
  );
};

export default TypewriterEffect;
