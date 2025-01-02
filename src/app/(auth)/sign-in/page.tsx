"use client";

import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

export default function Page() {
  // const session = useSession();

  // if (!session) {
  //   redirect("/");
  // }
  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };
  const GoogleLogin = async () => {
    // Perform Google sign-in with redirect to the homepage
    await signIn("google", { callbackUrl: "/" }); // Specify the redirect URL
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Sign In Account
      </h2>
      <Form {...form}>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center rounded-lg px-3 py-2">
                    <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="w-screen p-5 pl-8 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center rounded-lg px-3 py-2">
                    <Lock className=" absolute left-4 size-5 text-gray-400" />
                    <Input
                      type={openPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className="w-screen p-5 pl-8 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
                    />
                    <button
                      className="absolute right-4 text-gray-400"
                      onClick={() => setOpenPassword(!openPassword)}
                    >
                      {openPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </Form>

      <div className="mt-6">
        <button
          onClick={GoogleLogin}
          type="button"
          className="flex gap-2 items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <FaGoogle />
          <span className="text-gray-600">Login with Google</span>
        </button>
      </div>

      <p className="mt-4 text-sm text-center text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
