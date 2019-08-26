let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
console.log(`Using environment config: .env.${activeEnv}`)
require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Mapping services`,
    description: "Show services available around",
    author: `Florian HESLOUIN, credits: Kyle Pennelle`,
  },
  plugins: [

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "GoogleSpreadsheetExport",
        imagePath: "thumbnail",
        name: 'optimized_thumbnail',
      }
    },
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "GoogleSpreadsheetExport",
        imagePath: "locationImage", 
        name: 'optimized_location_image',
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mapping services`,
        short_name: `MapService`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        
      },
    },
    {
      resolve: "gatsby-source-google-spreadsheet",
      options: {
        spreadsheetId: process.env.SPREADSHEET_ID,
        typePrefix: "GoogleSpreadsheet",
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        filterNode: () => true,
        mapNode: node => node
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        
        theme: {
          palette: {
              primary: {
                  main: '#BA3D3B',
              } 
          },
      },
      },
    },
    'gatsby-plugin-offline',
  ],
}