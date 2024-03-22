"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function SignIn() {
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProviders(providers);
    })();
  }, []);

  return (
    <>
      <div className="flex justify-center w-full">
        <Card className="w-1/2 min-h-[calc(100vh-160px)]">
          <CardHeader className="flex justify-center items-center">
            <Image src="/icon.svg" alt="Logo" width={80} height={80} />
            <CardDescription>
              Faça login com a sua conta do SUAP
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 flex flex-col justify-center items-center">
            <p className="text-sm text-muted-foreground mb-6">Entrar com:</p>

            {Object.values(providers as object).map((provider) => (
              <Button
                variant="outline"
                key={provider.id}
                onClick={() => signIn(provider.id)}
              >
                {provider.name}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
