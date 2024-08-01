import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FcPrivacy } from "react-icons/fc";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/validate";
import { usePathname, useRouter } from "next/navigation";

const PasskeyMode: React.FC = () => {


  const router = useRouter()
  const path = usePathname();

  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState('')
const [error, setError] = useState("")


const encryptedKey =
typeof window !== "undefined"
  ? window.localStorage.getItem("accessKey")
  : null;

useEffect(() => {
const accessKey = encryptedKey && decryptKey(encryptedKey);

if (path)
  if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
    setOpen(false);
    router.push("/admin");
  } else {
    setOpen(true);
  }
}, [encryptedKey]);


const validatePasskey = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => {
  e.preventDefault();

  console.log(e)
  console.log(passkey)
  console.log( process.env.NEXT_PUBLIC_ADMIN_PASSKEY)

  if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
    const encryptedKey = encryptKey(passkey);

    localStorage.setItem("accessKey", encryptedKey);

    setOpen(false);
  } else {
    setError("Invalid passkey. Please try again.");
  }
};

  return (
    <div className="px-5">

    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-full max-w-lg mx-auto p-6 rounded-lg text-black shadow-lg bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between text-xl font-bold text-gray-800">
            Admin Verification Access
            <FcPrivacy size={34} />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2">
            To access the admin dashboard, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4">
          <InputOTP maxLength={6} className="flex justify-center" value={passkey} onChange={(value)=> setPasskey(value)}>
            <InputOTPGroup className="flex gap-2 w-full">
              <InputOTPSlot
                index={0}
                className="flex-1 w-full text-black font-semibold h-[54px] text-lg text-center border border-green-300 rounded bg-green-100 focus:bg-green-200 transition duration-200"
              />
              <InputOTPSlot
                index={1}
                className="flex-1 w-full text-black font-semibold   h-[54px] text-lg text-center border border-blue-300 rounded bg-blue-100 focus:bg-blue-200 transition duration-200"
              />
              <InputOTPSlot
                index={2}
                className="flex-1 w-full text-black font-semibold   h-[54px] text-lg text-center border border-pink-300 rounded bg-pink-100 focus:bg-pink-200 transition duration-200"
              />
            </InputOTPGroup>
            <InputOTPGroup className="flex gap-2 w-full">
              <InputOTPSlot
                index={3}
                className="flex-1 w-full text-black font-semibold  h-[54px] text-lg text-center border border-purple-300 rounded bg-purple-100 focus:bg-purple-200 transition duration-200"
              />
              <InputOTPSlot
                index={4}
                className="flex-1 w-full text-black font-semibold  h-[54px] text-lg text-center border border-yellow-300 rounded bg-yellow-100 focus:bg-yellow-200 transition duration-200"
              />
              <InputOTPSlot
                index={5}
                className="flex-1 w-full text-black font-semibold  h-[54px] text-lg text-center border border-red-300 rounded bg-red-100 focus:bg-red-200 transition duration-200"
              />
            </InputOTPGroup>
          </InputOTP>
          {error && ( 
            <div className="text-sm tracking-widest text-red-500 text-center mt-5  ">{error}</div>
          )}
        </div>
        <AlertDialogFooter className="mt-6 flex justify-end gap-2">
          <AlertDialogCancel className="py-2 px-4 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={(e)=> validatePasskey(e)} className="py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-700  transition duration-200">
           Get Started
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>

  );
};

export default PasskeyMode;
