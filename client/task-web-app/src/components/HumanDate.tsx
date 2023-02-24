import { format, parseISO } from 'date-fns'

export const HumanDate = ({isoDate}: {isoDate: string}) => {

  if (isoDate) {
    return (<span>{format(parseISO(isoDate), 'dd MMM yyyy')}</span>);
  } else {
    return (<span>not specified</span>)
  }

}
