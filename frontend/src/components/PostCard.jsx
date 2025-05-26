/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { format } from 'timeago.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaHeart } from "react-icons/fa";
import { Button, Modal } from 'antd';
import { MdDeleteOutline } from "react-icons/md";

export default function PostCard(props) {
  let obj = props.ele
  console.log(obj)
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {

    setIsModalOpen(true);

  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [commentValue, setcommentValue] = React.useState('');



  let userSlice = useSelector((state) => state.users)

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const likeOrDislikePost = async () => {
    try {
      let res = await axios.put(`http://localhost:8090/posts/likes/${obj._id}`, {}, {
        headers: {
          'Authorization': userSlice.token
        }
      })
      let data = res.data
      if (res.status == 200) {
        toast.success(data.msg)
        props.getAllPosts()
      }
    } catch (error) {
      console.log(error)
    }
  }


  const commentPost = async () => {
    let obj1 = { text: commentValue };

    let res = await axios.put(`http://localhost:8090/posts/comment/${obj._id}`, obj1, {
      headers: {
        'Authorization': userSlice.token
      }
    })

    let data = res.data;
    console.log(res)
    if (res.status == 200) {
      toast.success(data.msg)
       props.getAllPosts()
    }
  }

  const commentChanger = (e) => {
    setcommentValue(e.target.value)
  }
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ minWidth: 300, '--Card-radius': (theme) => theme.vars.radius.xs }}
      >
        <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: '-2px',
                borderRadius: '50%',
                background:
                  'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
              },
            }}
          >
            <Avatar
              size="md"
              src={obj.userId.profilePic}
              sx={{ border: '2px solid', borderColor: 'background.body' }}
            />
          </Box>
          <Typography sx={{ fontWeight: 'lg' }}>{obj.userId.name}</Typography>
          <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
            <MoreHoriz />
          </IconButton>
        </CardContent>
        <CardOverflow>
          {/* <AspectRatio>
          <img src="/static/images/cards/yosemite.jpeg" alt="" loading="lazy" />
        </AspectRatio> */}
          <Slider  {...settings}>


            {
              obj.files.map((file, i) => {
                return file.includes('image') ? <img src={file} alt="" /> : <video controls src={file}></video>
              })
            }
          </Slider>
        </CardOverflow>
        <CardContent orientation="horizontal" sx={{ alignItems: 'center', mx: -1 }}>
          <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
            {
              obj.likes.includes(userSlice.user._id) ? <IconButton onClick={likeOrDislikePost} variant="plain" color="neutral" size="sm">
                <FaHeart color='red' size={22} />
              </IconButton>

                :

                <IconButton onClick={likeOrDislikePost} variant="plain" color="neutral" size="sm">
                  <FavoriteBorder />

                </IconButton>
            }


            <IconButton onClick={showModal} variant="plain" color="neutral" size="sm">
              <ModeCommentOutlined />
              <sup className='-mt-4'>{obj.comment.length}</sup>
            </IconButton>
            {/* <IconButton variant="plain" color="neutral" size="sm">
            <SendOutlined />
          </IconButton> */}
          </Box>


        </CardContent>
        <CardContent>
          <Link
            component="button"
            underline="none"
            textColor="text.primary"
            sx={{ fontSize: 'sm', fontWeight: 'lg' }}
          >
            {obj.likes.length}  {obj.likes.length > 1000000 ? 'M' : obj.likes.length > 1000 ? 'K' : ''}  Likes
          </Link>
          <Typography sx={{ fontSize: 'sm' }}>

            {obj.title}
          </Typography>
          <Link
            component="button"
            underline="none"
            startDecorator="…"
            sx={{ fontSize: 'sm', color: 'text.tertiary' }}
          >
            more
          </Link>
          <Link
            component="button"
            underline="none"
            sx={{ fontSize: '13px', color: 'text.tertiary', my: 0.5 }}
          >
            <p>{format(obj.createdAt)}</p>
          </Link>
        </CardContent>
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
          <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
            <Face />
          </IconButton>
          <Input
            onChange={commentChanger}
            variant="plain"
            size="sm"
            value={commentValue}
            placeholder="Add a comment…"
            sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px', border: "1px solid lightgray", padding: "5px 10px" }}
          />
          <button onClick={commentPost} className='bg-[#102310] text-white px-3 py-1 rounded hover:bg-[#203a20] cursor-pointer' >
            Post
          </button>
        </CardContent>
      </Card>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Comments.."
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {
          obj.comment.map((ele, i)=>{
            return <div className='flex items-center gap-4 mb-7 w-full'>
              <img src={ele.userId.profilePic} className=' w-11 h-11 rounded-full' alt="" />
              <div className='w-full'>
                <h3 className='font-semibold'>{ele.userId.name}</h3>
                <p className='flex justify-between w-full'>{ele.text}    {userSlice.user._id ===ele.userId._id && <MdDeleteOutline color='red' size={20}/>}</p>
              </div>
            </div>
          })
        }
      </Modal>
    </div>
  );
}
