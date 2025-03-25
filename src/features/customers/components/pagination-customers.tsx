import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination';
import usePagination from '@/shared/hooks/use-pagination';

interface IPaginationCustomersProps {
  count: number;
}

const PaginationCustomers = ({ count }: IPaginationCustomersProps) => {
  const { page, pages, prevPage, nextPage, setSkip } = usePagination(count);
  const canPreviousPage = page > 1;
  const canNextPage = page < pages;

  const handlePageClick = (pageNumber: number) => {
    setSkip((pageNumber - 1) * 10); // Assuming 10 items per page
  };

  const renderPageLinks = () => {
    const pageLinks = [];
    for (let i = 1; i <= pages; i++) {
      pageLinks.push(
        <PaginationItem key={i}>
          <PaginationLink
            href='#'
            isActive={i === page}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pageLinks;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            disabled={!canPreviousPage}
            onClick={(e) => {
              e.preventDefault();
              if (canPreviousPage) prevPage();
            }}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href='#'
            disabled={!canNextPage}
            onClick={(e) => {
              e.preventDefault();
              if (canNextPage) nextPage();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export { PaginationCustomers };
