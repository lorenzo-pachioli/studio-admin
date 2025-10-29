import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { app  } from '@/services/firebase';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  console.log("app: ", app.automaticDataCollectionEnabled);
  //console.log("Firestore initialized:", db.app.name);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Logo />
      </header>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline">
                    Welcome to Seller Central
                  </h1>
                  <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    The all-in-one platform to manage your products and services on PawsomeMart. Grow your business and reach more pet lovers today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/register">
                      Get Started
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/login">
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    width={600}
                    height={600}
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} PawsomeMart. All rights reserved.</p>
      </footer>
    </div>
  );
}
