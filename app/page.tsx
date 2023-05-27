'use client';

import React from 'react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import IntroText from '@/components/landing/intro-text';
import Footer from '@/components/landing/footer';
import ThemeImg from '@/components/landing/theme-img';

const features = [
  {
    name: 'Instant thought storage',
    description:
      'Eternalog allows you to store your thoughts and ideas instantly. All it takes is a few clicks and typing in your thought.',
    href: '/eternalog',
  },
  {
    name: 'Categorize all your thoughts',
    description:
      'Put your thoughts into categories to make it easier to find them later. You can also add tags to your thoughts to make them even easier to find.',
    href: '/eternalog',
  },
  {
    name: 'Remains there forever.',
    description:
      'The way Eternalog is built allows your thoughts to be stored forever. No need to worry about losing your thoughts, unless you manually delete them.',
    href: '/eternalog',
  },
];

export default function Home() {
  return (
    <div>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center -m-1.5 p-1.5 text-2xl">
              <div className="bg-primary rounded-full p-0.5 mr-2">
                <Brain className="h-6 w-6 text-secondary " />
              </div>
              Eternalog
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>

          <div className="flex flex-1 justify-end space-x-4">
            <Link href="/eternalog">
              <Button variant="default">Launch App</Button>
            </Link>

            <ThemeSwitcher />
          </div>
        </nav>
      </header>

      <div className="relative isolate pt-14">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="py-12 sm:py-16 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <IntroText />
            </div>

            <ThemeImg />

            <div className="py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                  <h2 className="text-base font-semibold leading-7 text-muted-foreground">
                    Log your thoughts instantly
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Eternalog is an experimental app to log your thoughts
                  </p>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    Account-less, no sign up, no email, no password. Just you
                    and your thoughts.
                  </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                  <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                    {features.map((feature) => (
                      <div key={feature.name} className="flex flex-col">
                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 ">
                          {feature.name}
                        </dt>
                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 ">
                          <p className="flex-auto text-muted-foreground">
                            {feature.description}
                          </p>
                          <div className="mt-6">
                            <Link
                              href={feature.href}
                              className="text-sm font-semibold leading-6 hover:text-primary"
                            >
                              Launch App <span aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
