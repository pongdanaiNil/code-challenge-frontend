import ApplicationLayout from '@components/Layout'
import SkeletonPaginateTable from '@components/SkeletonPaginateTable'
import { Button, debounce, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import styles from '@styles/keywords'
import { KeywordsQuery, SkeletonPaginateTableProps } from '@utils/interface'
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { useGetKeywordsQuery } from '@features/Keyword'
import AddIcon from '@mui/icons-material/Add'
import UploadDialog from '@components/Dialog'

const Keywords: NextPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(5)
  const [open, setOpen] = useState(false)

  const searchBoxRef = useRef<HTMLInputElement>(null)

  let query : KeywordsQuery = {
    keyword: search,
    page: page.toString(),
    limit: perPage.toString()
  }

  const { data, isFetching } = useGetKeywordsQuery(query, { refetchOnMountOrArgChange: true })

  const debounceChange = debounce((page: number, perPage: number) => {
    setPage(page)
    setPerPage(perPage)
  }, 200)

  const onClickSearch = () => {
    setSearch(searchBoxRef.current?.value || '')
    setPage(0)
  }

  const tableData: SkeletonPaginateTableProps = {
    columns: [
      {
        id: 'id',
        label: t('keywords.table.head.id') as string
      },
      {
        id: 'keyword',
        label: t('keywords.table.head.keyword') as string,
        field: 'link',
        path: '/keywords'
      }
    ],
    isFetching: isFetching,
    tableData: data,
    perPage: perPage,
    page: page,
    debounceChange: debounceChange
  }

  const handleClose = () => setOpen(false)

  if (!mounted) { return null }
  return (
    <ApplicationLayout title='keywords'>
      <UploadDialog open={open} handleClose={handleClose}/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Typography sx={styles.boldText}>{t('keywords.texts.keyword')}</Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={3} sx={styles.createButtonBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            name="upload-csv"
            data-cy="upload-csv"
            startIcon={<AddIcon />}
          >
            {t('keywords.buttons.upload')}
          </Button>
        </Grid>
        <Grid item xs={9} md={7}>
          <TextField
            inputRef={searchBoxRef}
            fullWidth
            placeholder={t('keywords.texts.search') || ''}
            inputProps={{
              'data-cy': 'search_user_text'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={3} md={5} sx={styles.searchButtonBox}>
          <Button
            variant="contained"
            color="primary"
            data-cy="search-user-button"
            onClick={onClickSearch}
            sx={styles.searchButton}
          >
            {t('default.buttons.search')}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <SkeletonPaginateTable {...tableData} />
        </Grid>
      </Grid>
    </ApplicationLayout>
  )
}

export default Keywords
