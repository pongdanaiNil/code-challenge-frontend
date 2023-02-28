import ApplicationLayout from '@components/Layout'
import SkeletonPaginateTable from '@components/SkeletonPaginateTable'
import { Button, debounce, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import styles from '@styles/keywords'
import { SkeletonPaginateTableProps } from '@utils/interface'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import { useGetKeywordsQuery } from '@features/Keyword'

const Keywords: NextPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(15)
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const searchBoxRef = useRef<HTMLInputElement>(null)

  const { data, isFetching } = useGetKeywordsQuery()


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

  if (!mounted) { return null }
  return (
    <ApplicationLayout title='keywords'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Typography sx={styles.boldText}>{t('keywords.texts.keyword')}</Typography>
        </Grid>
        {/* <Grid item xs={12} md={4} lg={3} sx={styles.createButtonBox}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClickCreate}
            name="create-user"
            data-cy="create-user"
            startIcon={<AddIcon />}
          >
            {t('user.buttons.create')}
          </Button>
        </Grid> */}
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
