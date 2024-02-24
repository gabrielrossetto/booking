
import { Typography, Box } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import WifiIcon from '@mui/icons-material/Wifi';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

// TODO: Typescript
const Perks = ({ perks } = {}) => {
  // TODO: Typescript
  const handleIcon = (perkName) => {
    switch (perkName) {
      case 'pets':
        return <PetsIcon className="text-primary" />;
      case 'selfCheckIn':
        return <CheckIcon className="text-primary" />;
      case 'cancelFree':
        return <CancelIcon className="text-primary" />;
      case 'wifi':
        return <WifiIcon className="text-primary" />;
      default:
        return <AddIcon className="text-primary" />;
    }
  }

  // TODO: Typescript
  const handleText = (perkName) => {
    switch (perkName) {
      case 'pets':
        return <Typography className="pl-4 font-bold text-default">Pets Allowed</Typography>;
      case 'selfCheckIn':
        return <Typography className="pl-4 font-bold text-default">Self check-in</Typography>;
      case 'cancelFree':
        return <Typography className="pl-4 font-bold text-default">Free cancellation</Typography>;
      case 'wifi':
        return <Typography className="pl-4 font-bold text-default">Wifi</Typography>;
      default:
        return <Typography className="pl-4 font-bold text-default">N/A</Typography>;
    }
  }

  return (
    <div className="flex flex-col items-center justify-between w-full gap-8 mt-5">
      {/* TODO: Typescript */}
      {perks?.map((perk, index) => {
        return (
          <Box className="flex items-center w-full" key={index}>
            {handleIcon(perk)}
            {handleText(perk)}
          </Box>
        )
      })}
    </div>
  );
};

export default Perks;
