/** @jsx jsx */
import {Link, ArrowLink, jsx, Box, Text} from '@tishman/components';
import {Fragment} from 'react';

export interface ContactsInfoProps {
  /** info type, currently we support email and phone */
  type: string;
  /** info value, currently either email address or phone number */
  value: string;
}

export interface HoursAndAddressProps {
  /** Title above hours block */
  hoursHeading?: string;
  /** Array of hours text,
   * use getHoursProps() to format sanity hours data  */
  hours?: readonly string[];
  /**
   * Title above address block.
   *
   * if not provided, hours block will not be rendered */
  addressHeading?: string;
  /** location object
   *
   * if both location and contactsInfo are not provided,
   * address block will not be rendered
   */
  location?: {
    /** google map url  */
    url?: string;
    /** location title  */
    title?: string;
    /** street address */
    address1?: string;
    /** city, state, zip address */
    address2?: string;
  };
  /**
   * contactsInfo is a sanity object
   * which we loop through and add phone and email links
   *
   * if both location and contactsInfo are not provided,
   * address block will not be rendered
   *  */
  contactsInfo?: readonly ContactsInfoProps[];
  /** The url for the contactUs link */
  contactLinkUrl?: string;
}

const removeCharactersFromPhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const SpecialOffersHoursAndAddress = ({
  hoursHeading = `Hours`,
  hours,
  addressHeading = `Directions & Contact`,
  location,
  contactsInfo,
  contactLinkUrl,
}: HoursAndAddressProps): JSX.Element => {
  const linkStyles = {
    display: 'block',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    fontSize: 16,
  };

  const addressElement = location && (
    <Fragment>
      {location.address1 && <Text>{location.address1}</Text>}
      {location.address2 && <Text>{location.address2}</Text>}
    </Fragment>
  );

  return (
    <Box sx={{flexShrink: 0, maxWidth: 200}}>
      {hours && (
        <Box
          sx={
            {
              // mb: 4,
            }
          }
        >
          <Text sx={{fontWeight: 500, pb: [1, 2]}}>{hoursHeading}</Text>
          {hours.map((text) => (
            <Text key={text}>{text}</Text>
          ))}
        </Box>
      )}
      {(location || contactsInfo) && (
        <Box
          sx={
            {
              // mb: 4,
            }
          }
        >
          <Text sx={{fontWeight: 500, pb: [1, 2]}}>{addressHeading}</Text>

          {location?.url ? (
            <Link sx={linkStyles} href={location.url} target={'_blank'}>
              {addressElement}
            </Link>
          ) : (
            addressElement
          )}

          {contactsInfo &&
            contactsInfo.map((contact) =>
              contact.type === 'phone' ? (
                <Link
                  key={contact.value}
                  sx={linkStyles}
                  href={`tel:+1${removeCharactersFromPhone(contact.value)}`}
                >
                  {contact.value}
                </Link>
              ) : (
                <Link
                  key={contact.value}
                  sx={linkStyles}
                  href={`mailto:${contact.value}`}
                >
                  {contact.value}
                </Link>
              ),
            )}
        </Box>
      )}
      {contactLinkUrl && <ArrowLink href={contactLinkUrl} label="Contact Us" />}
    </Box>
  );
};
