import Client from './prismicHelpers';

// ~/utils/queries.js
async function fetchDocs(page = 1, routes = []): Promise<any> {
  const response = await Client().query('', { pageSize: 100, lang: '*', page });
  const allRoutes = routes.concat(response.results as any);
  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes);
  }
  // ES6 transpilation quirk and to avoid adding --downlevelIteration
  // wrap thew spread Set with Array.from
  // https://stackoverflow.com/questions/33464504/
  return [...Array.from(new Set(allRoutes))];
}

/** Fetches all Prismic documents and filters them (eg. by document type).
 *  In production, you would probably query documents by type instead of filtering them.
 **/
export const queryRepeatableDocuments = async (filter: any) => {
  const allRoutes = await fetchDocs();
  return allRoutes.filter(filter);
};
