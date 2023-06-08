'use client';

import { User, Link } from '@nextui-org/react';

export default function Footer() {
  return (
    <>
      <footer className="dark:bg-background/50 bg-background/80 backdrop-saturate-150 backdrop-blur w-full h-16 absolute bottom-0 border-t border-default-200 dark:border-default-100">
        <div className="flex h-full w-full justify-center items-center">
          <User
            name="Luiz H. da Silva Xinaider"
            description={(
              <Link href="https://github.com/Moeefa" size="xs" isExternal>
                @Moeefa
              </Link>
            )}
            avatarProps={{
              src: "https://avatars.githubusercontent.com/u/32604322?v=4"
            }}
          />
        </div>
      </footer>
    </>
  );
}
