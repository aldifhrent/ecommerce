"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

export default function Page() {
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      // Perbaiki cara mengirim params
      const res = await axios.get("http://localhost:5000/users", {
        params: { email: values.email }, // Correctly pass the email as a query parameter
      });

      if (res.data.exists) {
        toast("User Already Exist ");
      } else {
        await axios.post("http://localhost:5000/users", values);
        toast.success("Register Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Sign Up Account
      </h2>
      <Form {...form}>
        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center rounded-lg px-3 py-2">
                    <User className="absolute left-4 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Name"
                      {...field}
                      className="w-screen p-5 pl-8 text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-400"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
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
                    <div
                      className="absolute right-4 text-gray-400 cursor-pointer"
                      onClick={() => setOpenPassword(!openPassword)}
                    >
                      {openPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </Form>
      {/* Google Login */}
      <div className="mt-6">
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <FaGoogle />
          <span className="text-gray-600">Login with Google</span>
        </button>
      </div>

      <p className="mt-4 text-sm text-center text-gray-500">
        Don&apos;t have an account?{" "}
        <Link href="/sign-in" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
