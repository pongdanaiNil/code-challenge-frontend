import BackButton from '@components/BackButton'
import ApplicationLayout from '@components/Layout'
import { useGetKeywordQuery } from '@features/Keyword'
import { Skeleton } from '@mui/lab'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '@styles/keywords'
import ResultForm from '@components/ResultForm'
import { ResultFormProps } from '@utils/interface'

export default function Home() {

  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { data, isFetching } = useGetKeywordQuery(router.query.id as string)

  useEffect(() => {
    setMounted(true)
  }, [])

  const resultData: ResultFormProps = {
    keyword: data?.data.keyword || '',
    adwordsAdvertisers: data?.result.adwords_advertisers_count || 0,
    links: data?.result.links_count || 0,
    totalSearchResults: data?.result.total_search_results || '',
    htmlCode: data?.result.html_code || ''
  }

  if (!mounted) { return null }
  return (
    <ApplicationLayout title='Keyword' >
      {isFetching ? (
        <Skeleton variant="rounded" sx={styles.skeletonPanal} />
      ) : (
        <Grid container spacing={5}>
          <Grid item md={12}>
            <BackButton/>
          </Grid>
          <Grid item md={12}>
            <ResultForm {...resultData}/>
          </Grid>
        </Grid>
      )}
    </ApplicationLayout>
  )
}
