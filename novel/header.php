<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# book: http://ogp.me/ns/book# profile: http://ogp.me/ns/profile#">
<meta charset="UTF-8" />
<title><?php if (is_home()) { 
		bloginfo('name'); echo ' - '; bloginfo('description'); 
	}elseif (is_tax('tac-gia')) {
		echo 'Tác giả '.single_tag_title("", false).' - '.get_bloginfo('name');
	}elseif (is_singular('chap')) {
		echo get_the_title($post->post_parent).' - '. get_the_title();
	}else wp_title('');?></title>
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="google-site-verification" content="NpqS36hKNT71PXOCitWUqI8ixOBrAPIr-DJ9VNwLmKY" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="rating" content="General">
<link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url')?>/style.css" />
<script src="<?php bloginfo('template_url')?>/js/main.js"></script>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo('pingback_url');?>" />
<?php wp_head();?>
</head>
<body id="<?php bodyclass(); ?>">
<div id="wrap">
<div class="navbar navbar-default navbar-static-top" role="navigation" id="nav">
<div class="container">
<div class="navbar-header">
<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
<span class="sr-only">Show Menu</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
</button>
<h1><a class="header-logo" href="<?php echo home_url(); ?>" title="Đọc Truyện Hot">Đọc Truyện Hot</a></h1>
</div>
<div class="navbar-collapse collapse" itemscope itemtype="https://schema.org/WebSite">
<meta itemprop="url" content="<?php echo home_url(); ?>" />
<ul class="control nav navbar-nav">
<li class="dropdown">
<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-list"></span> Danh sách <span class="caret"></span></a>
<ul class="dropdown-menu" role="menu">
<li><a href="<?php echo home_url('truyen-moi')?>" title="Truyện mới">Truyện mới</a></li>
<li><a href="<?php echo home_url('truyen-hot')?>" title="Hot Novel">Truyện Hot</a></li>
<li><a href="<?php echo home_url('truyen-hoan-thanh')?>" title="Truyện Full">Truyện Full</a></li>
<li><a href="<?php echo home_url('truyen-convert')?>" title="Truyện Convert">Truyện Convert</a></li>
</ul>
</li>
<li class="dropdown">
<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-list"></span> Thể loại <span class="caret"></span></a>
<div class="dropdown-menu multi-column">
<div class="row">
<?php
$categories = get_categories('hide_empty=0&depth=1&type=post');
$i = 1;
?>
<div class="col-md-4">
<ul class="dropdown-menu">
<?php foreach($categories as $category):?>
<li><a href="<?php echo get_category_link($category)?>" title="<?php echo $category->cat_name?>"><?php echo$category->cat_name?></a></li>
<?php if($i % 6 == 0 && $i < count($categories)):?>
</ul>
</div>
<div class="col-md-4">
<ul class="dropdown-menu">
<?php endif;?>
<?php ++$i?>
<?php endforeach;?>
</ul>
</div>
</div>
</div>
</li>
<?php if(get_query_var('post_type') === 'chap'):?>
<li class="dropdown">
<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span> Tùy chỉnh <span class="caret"></span></a>
<div class="dropdown-menu dropdown-menu-right settings">
<form class="form-horizontal">
<div class="form-group form-group-sm">
<label class="col-sm-2 col-md-5 control-label" for="truyen-background">Màu nền</label>
<div class="col-sm-5 col-md-7">
<select class="form-control" id="truyen-background">
<option value="#F4F4F4">Xám nhạt</option>
<option value="#E9EBEE">Xanh nhạt</option>
<option value="#F4F4E4">Vàng nhạt</option>
<option value="#EAE4D3">Màu sepia</option>
<option value="#D5D8DC">Xanh đậm</option>
<option value="#FAFAC8">Vàng đậm</option>
<option value="#EFEFAB">Vàng ố</option>
<option value="#FFF">Màu trắng</option>
<option value="#232323">Màu tối</option>
</select>
</div>
</div>
<div class="form-group form-group-sm">
<label class="col-sm-2 col-md-5 control-label" for="font-chu">Font chữ</label>
<div class="col-sm-5 col-md-7">
<select class="form-control" id="font-chu">
<option value="'Palatino Linotype', serif">Palatino Linotype</option>
<option value="Bookerly, serif">Bookerly</option>
<option value="Minion, serif">Minion</option>
<option value="'Segoe UI', sans-serif">Segoe UI</option>
<option value="Roboto, sans-serif">Roboto</option>
<option value="'Roboto Condensed', sans-serif">Roboto Condensed</option>
<option value="'Patrick Hand', sans-serif">Patrick Hand</option>
<option value="'Noticia Text', sans-serif">Noticia Text</option>
<option value="'Times New Roman', serif">Times New Roman</option>
<option value="Verdana, sans-serif">Verdana</option>
<option value="Tahoma, sans-serif">Tahoma</option>
<option value="Arial, sans-serif">Arial</option>
</select>
</div>
</div>
<div class="form-group form-group-sm">
<label class="col-sm-2 col-md-5 control-label" for="size-chu">Size chữ</label>
<div class="col-sm-5 col-md-7">
<select class="form-control" id="size-chu">
<option value="16px">16</option>
<option value="18px">18</option>
<option value="20px">20</option>
<option value="22px">22</option>
<option value="24px">24</option>
<option value="26px">26</option>
<option value="28px">28</option>
<option value="30px">30</option>
<option value="32px">32</option>
<option value="34px">34</option>
<option value="36px">36</option>
<option value="38px">38</option>
<option value="40px">40</option>
</select>
</div>
</div>
<div class="form-group form-group-sm">
<label class="col-sm-2 col-md-5 control-label" for="line-height">Chiều cao dòng</label>
<div class="col-sm-5 col-md-7">
<select class="form-control" id="line-height">
<option value="100%">100%</option>
<option value="120%">120%</option>
<option value="140%">140%</option>
<option value="160%">160%</option>
<option value="180%">180%</option>
<option value="200%">200%</option>
</select>
</div>
</div>
<div class="form-group form-group-sm">
<label class="col-sm-2 col-md-5 control-label">Full khung</label>
<div class="col-sm-5 col-md-7">
<label class="radio-inline" for="fluid-yes"><input type="radio" name="fluid-switch" id="fluid-yes" value="yes" /> có</label>
<label class="radio-inline" for="fluid-no"><input type="radio" name="fluid-switch" id="fluid-no" value="no" checked /> Không</label>
</div>
</div>
</form>
</div>
</li>
<?php else: ?>
<li class="dropdown">
<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cog"></span> Tùy chỉnh <span class="caret"></span></a>
<div class="dropdown-menu dropdown-menu-right settings">
<form class="form-horizontal">
<div class="form-group form-group-sm">
<label class="col-sm-2 col-md-5 control-label" for="truyen-background">Màu nền</label>
<div class="col-sm-5 col-md-7">
<select class="form-control" id="truyen-background">
<option value="#F4F4F4">Xám nhạt</option>
<option value="#232323">Màu tối</option>
</select>
</div>
</div>
</form>
</div>
</li>
<?php endif; ?>
</ul>

<form class="navbar-form navbar-right" action="/" role="search" itemprop="potentialAction" itemscope itemtype="https://schema.org/SearchAction">
<div class="input-group search-holder">
<meta itemprop="target" content="<?php echo home_url(); ?>/search/{keyword}" />
<input aria-label="Keyword search" class="form-control" type="search" name="s" placeholder="Tìm kiếm..." value="" itemprop="query-input" required />
<div class="input-group-btn">
<button class="btn btn-default" type="submit" aria-label="Search"><span class="glyphicon glyphicon-search"></span></button>
</div>
</div>
<div class="list-group list-search-res hide"></div>

</form>

</div>
</div>


<div class="navbar-breadcrumb">
<div class="container breadcrumb-container"><?php the_breadcrumb()?></div>
</div>
</div>
