<?php
    /**
    *-------------------------------------------------------------------------*
    * Souei
    * Helpers pagging
    *
    * 処理概要/process overview  :
    * 作成日/create date         :   2016/11/15
    * 作成者/creater             :   vuongvt – vuongvt@ans-asia.com
    *
    * @package                  :   MASTER
    * @copyright                :   Copyright (c) ANS-ASIA
    * @version                  :   1.0.0
    *-------------------------------------------------------------------------*
    * DESCRIPTION
    *
    *
    *
    *
    */
namespace App\Helpers;
use Form;
class PaggingHelper {

    /**
    * show pagging for list
    * -----------------------------------------------
    * @author      :   vuongvt     - 2016/11/16 - create
    * @param       :   null
    * @return      :   null
    * @access      :   public
    * @see         :   remark
    */
    public static function show($page = array()) {
        $strpage = '';
        if (sizeof($page) != 0) {
            if (isset($page['pagesizeStored'])) {
                 // combobox select number of row
                $strpage  = '<div class="panel-title">';
                $strpage .= '   <ul class="heading-thumbnails">';
                $strpage .= '       <li>';
                $strpage .= '           <select name="select" class="form-control show-item-paging" id="page-size" style="width: 78px;">';
                $strpage .= '               <option value="10" '.($page['pagesize'] == 10 ? 'selected' : '').'>10 件</option>';
                $strpage .= '               <option value="50" '.($page['pagesize'] == 50 ? 'selected' : '').'>50 件</option>';
                $strpage .= '               <option value="100" '.($page['pagesize'] == 100 ? 'selected' : '').'>100 件</option>';
                $strpage .= '           </select>';
                $strpage .= '       </li>';
                $strpage .= '   </ul>';
                $strpage .= '</div>';
                //end update
                $strpage .= '<div class="heading-elements">';
                $strpage .= '   <ul class="pagination pagination-flat pagination-sm pagination-location">';
                $strpage .= '   </ul>';
                $strpage .= '</div>'; 
            } else {
                $start = min(($page['page']-1)*$page['pagesize']+1, $page['totalRecord']);
                $end   = min(($page['page'])*$page['pagesize'], $page['totalRecord']);
                $strpage  = '<div class="panel-title">';
                $strpage .= '   <ul class="heading-thumbnails">';
                $strpage .= '       <li>';
                $strpage .=             self::_showSize($page['pagesize']);
                $strpage .= '       </li>';
                $strpage .= '       <li>';
                $strpage .=             self::_displayCount($start, $end, $page['totalRecord']);
                $strpage .= '       </li>';
                $strpage .= '   </ul>';
                $strpage .= '</div>';
                $strpage .= '<div class="heading-elements">';
                $strpage .=     self::_showPage($page['page'],$page['pageMax'], $page['totalRecord']);
                $strpage .= '</div>';

            }
        } else {
            // combobox select number of row
            $strpage  = '<div class="panel-title">';
            $strpage .= '   <ul class="heading-thumbnails">';
            $strpage .= '       <li>';
            $strpage .= '           <select name="select" class="form-control show-item-paging" id="page-size" style="width: 78px;">';
            $strpage .= '               <option value="10">10 件</option>';
            $strpage .= '               <option value="50" selected>50 件</option>';
            $strpage .= '               <option value="100">100 件</option>';
            $strpage .= '           </select>';
            $strpage .= '       </li>';
            $strpage .= '   </ul>';
            $strpage .= '</div>';
            //end update
            $strpage .= '<div class="heading-elements">';
            $strpage .= '   <ul class="pagination pagination-flat pagination-sm pagination-location">';
            $strpage .= '   </ul>';
            $strpage .= '</div>'; 
        }

        echo $strpage;
    }

    /**
    * show pagging for list
    * -----------------------------------------------
    * @author      :   vuongvt     - 2016/11/16 - create
    * @author      :   DuyTP       - 2017/02/16 - fix [prev-next] btn to [first-last]
    * @param       :   null
    * @return      :   null
    * @access      :   public
    * @see         :   remark
    */
    private static function _showPage($page, $pageMax, $totalRecord){
        if( $totalRecord == 0 ){
            return '';
        }

        $disabledfirst = ($page <= 1 ) ? 'pagging-disable' : '';
        $pagePrevious = 0;
        if ($page > 1) {
            $pagePrevious = $page - 1;
        }
        $page1  = ($page <= 2)? '': $page - 2;
        $page2  = ($page <= 1)? '': $page - 1;
        $page4  = ($pageMax <= $page)? '': $page + 1;
        $page5  = ($pageMax <= $page + 1)? '': $page + 2;
        $disabledlast = ($page >= $pageMax ) ? 'pagging-disable' : '';

        $paging  = '<ul class="nav nav-pills pagination-location">';
        $paging .= '    <li class="' . $disabledfirst . '"><a class="' . $disabledfirst . '" page="1">←</a></li>'; // DuyTP 2017/02/16
        if ($page1 != '') {
            $paging .= '    <li><a page="' . $page1 . '">' . $page1 . '</a></li>';
        }
        if ($page2!= '') {
            $paging .= '    <li><a page="' . $page2 . '">' . $page2 . '</a></li>';
        }
        
        $paging .= '    <li><input type="text" id="paggging-number" class="form-control numeric" maxlength="9" page="'. $page .'" value="' . $page . '" /></li>';
        if ($page4 != '') {
            $paging .= '    <li><a page="' . $page4 . '">' . $page4 . '</a></li>';
        }
        if ($page5 != '') {
            $paging .= '    <li><a page="' . $page5 . '">' . $page5 . '</a></li>';
        }        
        $paging .= '    <li class="' . $disabledlast . '"><a page="' . $pageMax . '" class="' . $disabledlast . '>">→</a></li>'; // DuyTP 2017/02/16
        $paging .= '</ul>';
        return $paging;
    }

    /**
    * show pagging for list
    * -----------------------------------------------
    * @author      :   vuongvt     - 2016/11/16 - create
    * @param       :   null
    * @return      :   null
    * @access      :   public
    * @see         :   remark
    */
    private static function _showSize($size = 50) {
        $size10 = ($size == 10) ?  'selected' : '';
        $size50 = ($size == 50) ?  'selected' : '';
        $size100 = ($size ==100) ?  'selected' : '';
       
        $select  = '<select name="select" class="form-control show-item-paging" id="page-size" style="width: 78px;">';
        $select .= '    <option value="10" ' . $size10 . ' >10 件</option>';
        $select .= '    <option value="50" ' . $size50 . ' >50 件</option>';
        $select .= '    <option value="100" ' . $size100 . '>100 件</option>';
        $select .= '</select>';

        return $select;
    }

    /**
    * show pagging for list
    * -----------------------------------------------
    * @author      :   vuongvt     - 2016/11/16 - create
    * @param       :   null
    * @return      :   null
    * @access      :   public
    * @see         :   remark
    */
    private static function _displayCount($start, $end, $totalRecord ) {
        $displaycount = '';
        if ( $start != 0) {
            $displaycount = number_format($totalRecord) . "件中 " .  number_format($start) . "-" . number_format($end) . "件";
        } else {
            $displaycount =  number_format($totalRecord). "件 ";
        }

        return $displaycount;
    }
}