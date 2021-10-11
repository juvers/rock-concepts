/**@jsx jsx */
import {
  jsx,
  CalloutGrid,
  CalloutGridCard,
  Container,
  AnchorSection,
} from '@tishman/components';
import {graphql, useStaticQuery} from 'gatsby';
import {useMemo} from 'react';
import type {ComponentPropsWithoutRef} from 'react';
import invariant from 'invariant';

const RADIO_CITY_MUSIC_HALL_CALLOUT_GRID_QUERY = graphql`
  query RadioCityMusicHallCalloutGrid {
    dataJson(id: {eq: "radio-city-music-hall"}) {
      calloutGrid {
        title
        cards {
          title
          caption
          description
          image {
            src {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
            alt
          }
          links {
            label
            url
          }
          height
          width
          customCardType
        }
      }
    }
  }
`;

const RadioCityMusicHallCalloutGridBlock = (
  props: ComponentPropsWithoutRef<typeof AnchorSection>,
): JSX.Element => {
  const {
    dataJson,
  } = useStaticQuery<GatsbyTypes.RadioCityMusicHallCalloutGridQuery>(
    RADIO_CITY_MUSIC_HALL_CALLOUT_GRID_QUERY,
  );

  invariant(dataJson, 'Radio City Music Hall JSON data is required!');

  const radioCityMusicHallCalloutGridProps = useMemo(() => {
    return {
      title: dataJson.calloutGrid.title,
      cards: dataJson.calloutGrid.cards.map((card, index) => ({
        index: index,
        fluid: card.image.src.fluid,
        alt: card.image.alt,
        title: card.title,
        caption: card.caption,
        description: card.description,
        links: card.links && card.links.map((link) => link),
        width: card.width,
        height: card.height,
        customCardType: card.customCardType,
      })),
    };
  }, [dataJson]);

  return (
    radioCityMusicHallCalloutGridProps && (
      <AnchorSection {...props} theme="Rock Center">
        <Container
          sx={{
            pt: [5, null, 7],
          }}
        >
          <CalloutGrid title={radioCityMusicHallCalloutGridProps.title}>
            {radioCityMusicHallCalloutGridProps.cards.map((card) => (
              <CalloutGridCard
                key={card.index}
                {...card}
                maxWidth={card.width ?? undefined}
                ratio={
                  card.width && card.height
                    ? card.width / card.height
                    : undefined
                }
              />
            ))}
          </CalloutGrid>
        </Container>
      </AnchorSection>
    )
  );
};

export default RadioCityMusicHallCalloutGridBlock;
