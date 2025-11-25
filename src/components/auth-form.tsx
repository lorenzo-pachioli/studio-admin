"use client";

import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/services/firebase";
import { Logo } from "./logo";
import Link from "next/link";
import logInWithEmail from "@/services/autentication";
import { getAdminById, getAdminColection, setData } from "@/services/operations";
import { createSession } from "@/services/statelessSession";
import { UserContext } from "@/context/user-context";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useContext(UserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (mode === "login") {
        const userCredential = await logInWithEmail(
          values.email,
          values.password
        );

        if (!userCredential) throw new Error("Login failed");

        await createSession(userCredential.uid);
        const userData = await getAdminById(userCredential.uid);
        if (!userData) throw new Error("User data not found");

        login(userData);
        toast({ title: "Success", description: "Logged in successfully." });
        router.push("/dashboard");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        const userData = {
          displayName: userCredential.user.displayName || "", // Use provided name if available
          photoURL: userCredential.user.photoURL || "",
          email: userCredential.user.email || values.email,
          emailVerified: userCredential.user.emailVerified || false,
          addresses: []
        };

        // Save the new user data to the database
        await setData("Admins", userCredential.user.uid, userData);
        await createSession(userCredential.user.uid);
        toast({
          title: "Success",
          description: "Account created successfully.",
        });
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const title =
    mode === "login" ? "Sign in to your account" : "Create a new account";
  const buttonText = mode === "login" ? "Sign In" : "Create Account";
  const linkText =
    mode === "login" ? "Don't have an account?" : "Already have an account?";
  const linkHref = mode === "login" ? "/register" : "/login";

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <Logo className="justify-center mb-4" />
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : buttonText}
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        {linkText}{" "}
        <Link href={linkHref} className="underline">
          {mode === "login" ? "Sign up" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
