// ~/utils/prismicHelpers.js
import Prismic from '@prismicio/client';
import Link from 'next/link';
import { ReactChild, ReactFragment, ReactPortal, Key } from 'react';
import {
  apiEndpoint,
  accessToken,
  linkResolver,
  Router,
} from '../prismicConfiguration';

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (
  _type: any,
  element: { data: { type: string; uid: any } },
  content:
    | boolean
    | ReactChild
    | ReactFragment
    | ReactPortal
    | null
    | undefined,
  _children: any,
  index: Key | null | undefined
) => {
  return (
    <Link key={index} href={linkResolver(element.data)}>
      <a>{content}</a>
    </Link>
  );
};

// -- @prismicio/client initialisation
// Initialises the Prismic Client that's used for querying the API and passes it any query options.
export const Client = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken, Router));

// Options to be passed to the Client
const createClientOptions = (
  req = null,
  prismicAccessToken: string | undefined | null = null,
  routes: {
    routes: {
      type: string;
      path: string;
    }[];
  } | null = null
) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  const routesOption = routes ? { routes: Router.routes } : {};
  return {
    ...reqOption,
    ...accessTokenOption,
    ...routesOption,
  };
};

export default Client;
