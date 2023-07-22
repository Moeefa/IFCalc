'use client';

import { Link, User } from '@nextui-org/react';

export default function Footer() {
  return (
    <>
      <footer className="h-20">
        <div className="dark:bg-background/70 bg-background/80 backdrop-saturate-150 backdrop-blur-lg w-full h-16 fixed bottom-0 border-t border-default-200 dark:border-default-100">
          <div className="flex h-full w-full justify-center items-center">
            <User
              name="Luiz Henrique da Silva Xinaider"
              description={(
                <div className="flex gap-4">
                  <Link href="https://github.com/Moeefa" size="sm" isExternal>
                    Github
                  </Link>
                  <Link href="https://www.linkedin.com/in/xinaider" size="sm" isExternal>
                    LinkedIn
                  </Link>
                </div>
              )}
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/32604322?v=4"
              }}
            />
          </div>
        </div>
      </footer>
    </>
  );
}
