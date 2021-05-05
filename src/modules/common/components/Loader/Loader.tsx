import LoaderGif from '../../../../assets/img/loader.gif';
import './Loader.scss';

type Props = {
  isLoading: boolean;
};
const Loader = (props: Props): JSX.Element => {
  const { isLoading } = props;

  if (!isLoading) return <></>;
  return (
    <>
      <div className="loader-container">
        <div className="loader">
          <img src={LoaderGif} className="gif" alt="gif" />
        </div>
      </div>
    </>
  );
};

export default Loader;
