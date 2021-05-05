import IMeta from '../../../../types/MetaType';
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

interface IProps {
  meta: IMeta;
  handlerPage: (page: number) => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default function PaginationControlled(props: IProps) {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.handlerPage(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={props.meta.total_pages}
        page={props.meta.current_page}
        onChange={handleChange}
      />
    </div>
  );
}
