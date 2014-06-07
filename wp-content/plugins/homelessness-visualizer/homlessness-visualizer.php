<?php

/*!
 * Plugin Name: Homelessness Visualizer
 * Description: Homelessness Visualization Tool for Western Mass Housing First created at Hack For Western MA
 * Version: 0.0.1
 */

set_include_path(__DIR__ . '/lib/google-api-php-client-master/src');

require_once('Google/Client.php'); 
require_once('Google/Service/Drive.php'); 

$client = new Google_Client();
$client->setClientId('805002532140-nqvfdpbhsf3piu9oltkpk097ltc98qo6.apps.googleusercontent.com');
$client->setApplicationName('HomelessnessVisualizer');
$client->setDeveloperKey('AIzaSyDcaArKSIPS-RvQWX94hjYkB4vicFOwZEc');
$service = new Google_Service_Drive($client);

// $service


// die(print_r($service->files->get('1lrRpCdrbDTdgbSa0gCaRER9KuYOMa6d3yS-1V3WZX-U')));

class HomelessnessVisualizer {

	var $cache_time = 600;

	public function __construct() 
	{
		$this->plugin_path = plugin_dir_path(__FILE__);
		$this->register_scripts();
	}

	public function register_scripts()
	{
		wp_register_script('jquery', $this->plugin_path . '/assets/js/bower_components/jquery/dist/jquery.min.js');
	}

	public function get_data($key = '', $callback, $cache_time = null)
	{
		if (false === ($result = get_transient($key))) 
		{
			// It wasn't there, so regenerate the data and save the transient
			$result = $callback();

			$cache_time = is_null($cache_time) ? $this->cache_time : $cache_time;

			set_transient($key, $result, $cache_time);
		}

		return $result;
	}

}

// $test = new HomelessnessVisualizer();