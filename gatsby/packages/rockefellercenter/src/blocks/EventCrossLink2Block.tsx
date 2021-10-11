/** @jsx jsx */
import {jsx, Flex, Section, Container, CrossLink} from '@tishman/components';
import {graphql, useStaticQuery} from 'gatsby';
import {useMemo} from 'react';
import type {ComponentPropsWithoutRef} from 'react';
import invariant from 'invariant';

const EVENT_CROSS_LINK_2_QUERY = graphql`
  query EventCrossLink2 {
    dataJson(id: {eq: "event"}) {
      crossLinks2 {
        title
        caption
        image {
          src {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          alt
        }
        link {
          label
          url
        }
      }
    }
  }
`;

const EventCrossLink2Block = (
  props: ComponentPropsWithoutRef<typeof Section>,
): JSX.Element => {
  const {dataJson} = useStaticQuery<GatsbyTypes.EventCrossLink2Query>(
    EVENT_CROSS_LINK_2_QUERY,
  );

  invariant(dataJson, 'Event JSON data is required!');

  const eventCrossLink2Props = useMemo(() => {
    return dataJson.crossLinks2.map((crossLink) => ({
      fluid: crossLink.image.src.fluid,
      alt: crossLink.image.alt,
      caption: crossLink.caption,
      title: crossLink.title,
      link: crossLink.link,
    }));
  }, [dataJson]);

  return (
    eventCrossLink2Props && (
      <Section {...props}>
        <Container sx={{py: [3, 4, 6]}}>
          <Flex
            sx={{
              justifyContent: 'space-between',
              flexDirection: ['column', null, 'row'],
            }}
          >
            {eventCrossLink2Props.map((crossLink) => (
              <CrossLink key={crossLink.title} {...crossLink} />
            ))}
          </Flex>
        </Container>
      </Section>
    )
  );
};

export default EventCrossLink2Block;
