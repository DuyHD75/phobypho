import React from 'react'
import UserSidebar from './UserSidebar'
import { Box, Typography, Stack } from '@mui/material'
import Grid from '@mui/material/Grid';
import uiConfigs from '../../configs/ui.config';
import { SiTicktick } from "react-icons/si";
import { upgradeAccountPolicy } from '../../asset/data';
import { useSelector } from 'react-redux';
import LinearProgress from "@mui/material/LinearProgress";

const UpgradeAccount = () => {


  const { user } = useSelector(state => state.user);

  const bookingCount = user && user.userData ? user.userData.bookingCount : 0;

  let nextRankAccount = undefined, typeOfAccount = undefined;
  if (user && user.userData) {
    if (user.userData.typeOfAccount) {
      typeOfAccount = user.userData.type_of_account.toUpperCase();
      const findAccountRank = user.userData.type_of_account && upgradeAccountPolicy.features.findIndex(item => item.title.toLowerCase().includes(user.userData.type_of_account.toLowerCase()));
      nextRankAccount = findAccountRank !== -1 ? upgradeAccountPolicy.features[findAccountRank + 1] : undefined;
    }else {
      nextRankAccount = upgradeAccountPolicy.features[0];
    }
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const timeLimit = new Date(currentDate.getFullYear(), Math.floor(currentMonth / 3) * 3, 0).toLocaleDateString('vi-VN', { year: "numeric", month: "short", day: "numeric" });



  return (
    <UserSidebar>

      <Typography sx={{
        ...uiConfigs.style.typoLines(1, 'left'),
        fontSize: '1rem',
        color: 'primary.headerColor',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
        bgcolor: '#172149',
        padding: '1rem',
        borderRadius: '10px',
        border: '2px solid rgba(255,255,255,0.1)',
      }}>Nâng Cấp Tài Khoản</Typography>
      {/**progress */}
      <Box sx={{
        padding: '1rem 2rem',
        marginBottom: '2rem',
        position: 'relative',
        width: '100%',
        boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
        borderRadius: '10px',
      }}>
        <img src="https://firebasestorage.googleapis.com/v0/b/phobypho-2dbae.appspot.com/o/icons%2Fundraw_all_the_data_re_hh4w.svg?alt=media&token=91feae1d-d639-4213-96b4-c05b1179168f" alt=""
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'contain',
            objectPosition: 'center',
            borderRadius: '10px',
            position: 'absolute',
            right: 50,
            top: 0
          }}
        />

        <Typography sx={{
          ...uiConfigs.style.typoLines(3, 'left'),
          fontSize: '1.2rem',
          color: '#fb4b20',
          fontWeight: '700',
        }}>{`Nâng Cấp Thứ Hạng Tài Khoản`}  </Typography>


        {typeOfAccount && (
          <Typography sx={{
            ...uiConfigs.style.typoLines(1, 'left'),
            fontSize: '1rem',
            color: 'primary.headerColor',
            marginTop: '1rem',
            textShadow: '1px 1px 0.5px #000',
          }}>
            {`Bạn đang ở thứ hạng: ${typeOfAccount}`}
          </Typography>
        )}


        <Typography sx={{
          ...uiConfigs.style.typoLines(1, 'left'),
          fontSize: '1rem',
          color: 'secondary.colorText',
          marginTop: '1rem',
        }}>
          {`Lượt booking của bạn: ${bookingCount} / ${nextRankAccount?.description}`}
          <LinearProgress variant="determinate" value={(bookingCount / parseInt(nextRankAccount?.description.split(" ")[0])) * 100}
            sx={{
              width: '70%'
            }} />
        </Typography>

        <Box sx={{
          ...uiConfigs.style.typoLines(1, 'left'),
          fontSize: '1rem',
          color: 'secondary.subText',
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',

        }}>
          {`Thứ hạng sẽ được cập nhật lại sau: `}
          <Typography sx={{ color: '#fb4b20', paddingLef: '5px', ...uiConfigs.style.typoLines(1, 'left'), }}>{timeLimit}</Typography>
          {`. Chi tiết xem bên dưới ⬇️!`}
        </Box>
      </Box>


      {/** End progress */}
      <Grid container spacing={2}>
        {upgradeAccountPolicy.features.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box sx={{
              position: 'relative',
              borderRadius: '5px',
              boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
              <Stack flexDirection={"column"} alignItems={"center"} justifyContent={"center"}
                sx={{
                  position: 'relative',
                  borderRadius: '5px',
                  boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  width: '100%',
                  padding: '1rem',
                }}>
                <Typography variant='p' sx={{
                  textAlign: 'center',
                  color: 'secondary.colorText',
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  ...uiConfigs.style.typoLines(1, 'center'),
                  padding: '1rem 0',
                  zIndex: 3
                }}>{item.title}</Typography>
                <img src={item.icon} alt={item.title} style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'fill',
                  objectPosition: 'center',
                  position: 'absolute',
                  top: 0,
                  left: 10,
                  zIndex: 0
                }} />
              </Stack>

              <Stack sx={{ width: '100%', padding: '1rem 0.5rem' }} >

                <Box sx={{ ...uiConfigs.style.typoLines(2, "center"), marginBottom: '1rem' }}  >
                  <Typography variant='body1' sx={{
                    color: 'secondary.main',
                    textTransform: 'uppercase',
                  }}>
                    {item.description}
                  </Typography>
                </Box>

                <Box sx={{
                  ...uiConfigs.style.typoLines(3, "left"),
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}  >
                  <SiTicktick style={{
                    color: '#13aa52',
                    fontSize: '2rem',
                  }} />
                  <Typography variant='body1' sx={{
                    color: 'secondary.colorText',
                    padding: '0 1rem'
                  }}>
                    {item.offer}
                  </Typography>
                </Box>

                <Box sx={{
                  ...uiConfigs.style.typoLines(3, "left"),
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}  >
                  <SiTicktick style={{
                    color: '#13aa52',
                    fontSize: '1rem',
                  }} />
                  <Typography variant='body1' sx={{
                    color: 'secondary.colorText',
                    padding: '0 1rem',
                    fontSize: '1rem'
                  }}>
                    {item.timeReset}
                  </Typography>
                </Box>

                <Box sx={{
                  ...uiConfigs.style.typoLines(3, "left"),
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}  >
                  <SiTicktick style={{
                    color: '#13aa52',
                    fontSize: '3rem',
                  }} />
                  <Typography variant='body1' sx={{
                    color: 'secondary.colorText',
                    padding: '0 1rem',
                    fontSize: '1rem'
                  }}>
                    {item.rule}
                  </Typography>
                </Box>

              </Stack>

            </Box>
          </Grid>
        ))}
      </Grid>
    </UserSidebar >
  )
};


export default UpgradeAccount;