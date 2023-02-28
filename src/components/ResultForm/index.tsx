import { Grid, Paper, Typography } from "@mui/material"
import { ResultFormProps } from "@utils/interface"
import { useTranslation } from "react-i18next"
import styles from "./style"

export default function ResultForm(props: ResultFormProps) {

  const { keyword, adwordsAdvertisers, links, totalSearchResults, htmlCode } = props

  const { t } = useTranslation()

  return(
    <Paper elevation={3} sx={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={styles.boldText}>
            { t('result.texts.keyword') }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{ keyword }</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={styles.boldText}>
            {t('result.texts.result')}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={styles.centerText}>
          <Typography sx={styles.mediumText}>{t('result.texts.ads')}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography>{ adwordsAdvertisers }</Typography>
        </Grid>
        <Grid item xs={12} sx={styles.centerText}>
          <Typography sx={styles.mediumText}>{t('result.texts.link')}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography>{ links }</Typography>
        </Grid>
        <Grid item xs={12} sx={styles.centerText}>
          <Typography sx={styles.mediumText}>{t('result.texts.totalResult')}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography>{ totalSearchResults }</Typography>
        </Grid>
        <Grid item xs={12} sx={styles.centerText}>
          <Typography sx={styles.mediumText}>{t('result.texts.html')}</Typography>
        </Grid>
        <Grid item xs={11}>
          <Typography>{ htmlCode }</Typography>
        </Grid>
        
      </Grid>
    </Paper>
  )
}