// const fetch = require('node-fetch');

const resolvers = {
  Query: {
    tracksForHome(_, __, context) {
      const { dataSources } = context;

      return dataSources.trackAPI.getTracksForHome();
    },
    // tracksForHomeFetch: async () => {
    //   const baseUrl = 'https://odyssey-lift-off-rest-api.herokuapp.com';
    //   const response = await fetch(`${baseUrl}/tracks`);
    //   return response.json();
    // },
    track: (_, args, context) => {
      const { id } = args;
      const {
        dataSources: { trackAPI },
      } = context;

      return trackAPI.getTrack(id);
    },
    module: (_, args, context) => {
      const { id } = args;
      const {
        dataSources: { trackAPI },
      } = context;

      return trackAPI.getModule(id);
    },
  },
  Mutation: {
    incrementTrackViews: async (_, args, context) => {
      const { id } = args;
      const {
        dataSources: { trackAPI },
      } = context;
      try {
        const track = await trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (error) {
        const {
          extensions: {
            response: { status, body },
          },
        } = error;

        return {
          code: status,
          success: false,
          message: body,
          track: null,
        };
      }
    },
  },
  Track: {
    author: (parent, _, context) => {
      const { authorId } = parent;
      const {
        dataSources: { trackAPI },
      } = context;

      return trackAPI.getAuthor(authorId);
    },
    modules: (parent, _, context) => {
      const { id } = parent;
      const {
        dataSources: { trackAPI },
      } = context;

      return trackAPI.getTrackModules(id);
    },
  },
};

module.exports = resolvers;
