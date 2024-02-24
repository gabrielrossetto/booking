import SearchIcon from '@mui/icons-material/Search';

// TODO: Typescript
const RoundSearchButton = ({ onClick }) => {
  return (
    <button
      className="p-2 rounded-full bg-primary hover:bg-primary-dark"
      onClick={onClick}
    >
      <SearchIcon className="w-6 h-6 text-white" />
    </button>
  );
};

export default RoundSearchButton;