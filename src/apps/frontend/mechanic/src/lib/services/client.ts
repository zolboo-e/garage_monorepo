//
import { initClient, InitClientReturn } from "@ts-rest/core";

//
import { contracts } from "ts-rest";

export const client: InitClientReturn<typeof contracts> = initClient(
  contracts,
  {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL!,
    baseHeaders: {},
    api: async ({ path, method, headers, body }) => {
      const response = await fetch(path, {
        method,
        body,
        headers,
        cache: "no-store",
      });

      if (!response.ok) {
        const error = await response.text();

        return {
          status: response.status,
          body: error,
        };
      }

      return {
        status: response.status,
        body: await response.json(),
      };
    },
  }
);
