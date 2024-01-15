const Export = ({ onExport }) => (
  <button
    className="rounded border border-primary-500 bg-primary-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-primary-700 hover:bg-primary-700 focus:ring focus:ring-primary-200 disabled:cursor-not-allowed disabled:border-primary-300 disabled:bg-primary-300"
    onClick={(e) => onExport(e.target.value)}
  >
    Export
  </button>
);

export default Export;